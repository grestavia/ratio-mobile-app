import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements'

export default function Home() {
    const [search, setSearch] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(process.env.API_URL + `/photos?title=`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZGEzNmQ1NC1iNjFmLTQ4YTctOGEzOS01YjhkNTRiMGY3MGYiLCJpYXQiOjE3MDkzODgyMDl9.93ueZkm3a2LUCAFWDFBb_IxI2FgS1geznmOGQjuMEn8',
                },
            });
            setImages(response.data.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://8x62n0vs-5000.asse.devtunnels.ms/photos?title=${encodeURIComponent(search)}`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZGEzNmQ1NC1iNjFmLTQ4YTctOGEzOS01YjhkNTRiMGY3MGYiLCJpYXQiOjE3MDkzODgyMDl9.93ueZkm3a2LUCAFWDFBb_IxI2FgS1geznmOGQjuMEn8',
                },
            });
            setImages(response.data.data);
        } catch (error) {
            console.error('Error searching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderImages = () => {
        return images.map((item, index) => {
            const imageUri = 'https://8x62n0vs-5000.asse.devtunnels.ms/files/images/photos/' + item.locationFile;
            return (
                <TouchableOpacity key={index} style={styles.imageContainer}>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                    <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
            );
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchBar}>
                <View style={styles.separate}>
                    <Icon name="search" type="material" color="#003502" />
                    <TextInput
                        style={styles.input}
                        placeholder='Cari "Konser"'
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>
            {loading ? (
                <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
            ) : (
                <View style={styles.imageList}>
                    {renderImages()}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    searchBar: {
        marginHorizontal: 15,
        borderRadius: 50,
        paddingHorizontal: 10,
        marginTop: 40,
        backgroundColor: '#EEEFE6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    separate: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderRadius: 50,
        padding: 10,
    },
    searchButton: {
        marginLeft: 10,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    imageList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginBottom: 80,
    },
    imageContainer: {
        width: '49%',
        aspectRatio: 1,
        marginVertical: 5,
    },
    image: {
        flex: 1,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    loader: {
        marginTop: 20,
    },
    title: {
        paddingStart: 10,
        fontSize: 13,
    }
});
