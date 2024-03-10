import React, { useRef } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from 'react-native-elements';

export default function Profile() {

    const [userdata, setUserData] = useState([]);
    const [post, setPost] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(process.env.API_URL + `/users/current`, {
                headers: {
                    Authorization: `Bearer ${process.env.TOKEN}`,
                },
            });
            setUserData(response.data.data[0]);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const fetchUtility = async () => {
        try {
            const [response1, response2, response3, response4] = await Promise.all([
                axios.get(process.env.API_URL + `/users/${userdata.id}/photos`, { headers: { Authorization: `Bearer ${process.env.TOKEN}`, } }),
                axios.get(process.env.API_URL + `/users/${userdata.id}/albums`, { headers: { Authorization: `Bearer ${process.env.TOKEN}`, } }),
                axios.get(process.env.API_URL + `/users/${userdata.id}/following`, { headers: { Authorization: `Bearer ${process.env.TOKEN}`, } }),
                axios.get(process.env.API_URL + `/users/${userdata.id}/followers`, { headers: { Authorization: `Bearer ${process.env.TOKEN}`, } }),
            ])
            setPost(response1.data.data);
            setFollowing(response3.data.data);
            setFollowers(response4.data.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    useEffect(() => {
        fetchUtility();
    }, [userdata]);

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headertext}>
                    <Text style={{ fontWeight: "bold" }}>Ratios </Text>
                    <Text>Account</Text>
                </Text>
                <TouchableOpacity>
                    <Icon
                        size={25}
                        name="menu"
                        type="material"
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.userContainer}>
                    <Image source={{ uri: process.env.API_URL + '/files/images/profiles/' + userdata.photoUrl }} style={styles.userImage} />
                    <View style={{ gap: 8 }}>
                        <View style={{ gap: 0 }}>
                            <Text style={[styles.textusercontainer, { fontWeight: "bold" }]}>{userdata.fullName}</Text>
                            <Text>@{userdata.username}</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Text style={styles.utils}>
                                <Text style={{ fontWeight: "bold" }}>{post.length} </Text>
                                <Text>Post</Text>
                            </Text>
                            <Text style={styles.utils}>
                                <Text style={{ fontWeight: "bold" }}>{followers.length} </Text>
                                <Text>Pengikut</Text>
                            </Text>
                            <Text style={styles.utils}>
                                <Text style={{ fontWeight: "bold" }}>{following.length} </Text>
                                <Text>Mengikuti</Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", width: "100%", gap: 3, paddingHorizontal: 20 }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: "white" }}>Edit Profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: "white" }}>Bagikan Profil</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    userImage: {
        width: 90,
        height: 90,
        borderRadius: 100,
        marginBottom: 10,
        borderColor: "#07A081",
        borderWidth: 3
    },
    utils: {
        fontSize: 14
    },
    textusercontainer: {
        fontSize: 17
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#07A081",
        position: 'sticky',
        top: 0,
        zIndex: 1,
    },
    headertext: {
        color: "white",
        fontSize: 20,
    },
    userContainer: {
        alignItems: 'center',
        paddingTop: 20,
        gap: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        marginBottom: 7
    },
    button: {
        width: "50%",
        alignItems: "center",
        backgroundColor: "#07A081",
        padding: 10,
        borderRadius: 7
    }
})
