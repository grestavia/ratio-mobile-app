import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const DetailPost = ({ route }) => {
    const { photoId } = route.params;
    const [imagedata, setImagedata] = useState([]);
    const [imageDimensions, setImageDimensions] = useState({ width: 100, height: 100 });
    const [isLoading, setIsLoading] = useState(true); // Tambahkan state isLoading

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(process.env.API_URL + `/photos/${photoId}`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZGEzNmQ1NC1iNjFmLTQ4YTctOGEzOS01YjhkNTRiMGY3MGYiLCJpYXQiOjE3MDkzODgyMDl9.93ueZkm3a2LUCAFWDFBb_IxI2FgS1geznmOGQjuMEn8'
                    }
                });
                setImagedata(response.data.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, []);

    useEffect(() => {
        if (imagedata.locationFile) {
            try {
                Image.getSize(process.env.API_URL + '/files/images/photos/' + imagedata.locationFile, (width, height) => {
                    setImageDimensions({ width, height });
                });
            } catch (error) {
                console.error('Gagal mendapatkan dimensi gambar:', error);
            }
        } else {
            console.log('Gambar tidak ditemukan');
        }
    }, [imagedata]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView>
            <View>
                <Image
                    source={{ uri: process.env.API_URL + '/files/images/photos/' + imagedata.locationFile }}
                    style={[{ width: '100%', aspectRatio: imageDimensions.width / imageDimensions.height }]}
                    resizeMode="contain"
                />
                <Text>Detail Post #{imagedata.title}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DetailPost;
