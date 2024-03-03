import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const [search, setSearch] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [imageDimensions, setImageDimensions] = useState([]);

    const navigation = useNavigation();

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
            setImageDimensions([]); // Reset dimensions when fetching new images
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        if (images.length > 0) {
            images.forEach((item, index) => {
                Image.getSize(process.env.API_URL + '/files/images/photos/' + item.locationFile, (width, height) => {
                    setImageDimensions(prevDimensions => [...prevDimensions, { width, height }]);
                })
            })
        }
    }, [images]);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(process.env.API_URL + `/photos?title=${encodeURIComponent(search)}`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZGEzNmQ1NC1iNjFmLTQ4YTctOGEzOS01YjhkNTRiMGY3MGYiLCJpYXQiOjE3MDkzODgyMDl9.93ueZkm3a2LUCAFWDFBb_IxI2FgS1geznmOGQjuMEn8',
                },
            });
            setImages(response.data.data);
            setImageDimensions([]);
        } catch (error) {
            console.error('Error searching images:', error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    const renderLeftImages = () => {
        if (imageDimensions.length > 0) {
            const halfLength = Math.ceil(images.length / 2);
            const leftImages = images.slice(0, halfLength);
            return leftImages.map((item, index) => {
                const imageUri = process.env.API_URL + '/files/images/photos/' + item.locationFile;
                return (
                    <TouchableOpacity key={index} style={styles.imageContainer} onPress={() => navigateToDetail(item.id)}>
                        <Image
                            source={{ uri: imageUri }}
                            style={[styles.image, imageDimensions[index] && { aspectRatio: imageDimensions[index].width / imageDimensions[index].height }]}
                            resizeMode="contain" />
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                );
            });
        }
    };

    const renderRightImages = () => {
        if (imageDimensions.length > 0) {
            const halfLength = Math.ceil(images.length / 2);
            const rightImages = images.slice(halfLength);
            return rightImages.map((item, index) => {
                const imageUri = process.env.API_URL + '/files/images/photos/' + item.locationFile;
                return (
                    <TouchableOpacity key={index} style={styles.imageContainer} onPress={() => navigateToDetail(item.id)}>
                        <Image
                            source={{ uri: imageUri }}
                            style={[styles.image, imageDimensions[index + halfLength] && { aspectRatio: imageDimensions[index + halfLength].width / imageDimensions[index + halfLength].height }]}
                            resizeMode="contain" />
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                );
            });
        }
    };

    const navigateToDetail = (photoId) => {
        navigation.navigate('DetailPost', { photoId: photoId });
    };

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY === 5 && !isRefreshing) {
            setIsRefreshing(true);
            fetchImages();
        }
    };

    return (
        <ScrollView
            style={styles.container}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={fetchImages}
                />
            }
        >
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
                <ActivityIndicator style={styles.loader} size="large" color="#D9EDC8" />
            ) : (
                <View style={styles.row}>
                    <View style={styles.imageList}>
                        {renderLeftImages()}
                    </View>
                    <View style={styles.imageList}>
                        {renderRightImages()}
                    </View>
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
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    imageList: {
        flexDirection: 'column',
        paddingHorizontal: 5,
        marginBottom: 80,
        flex: 1,
        marginHorizontal: 0,
    },
    imageContainer: {
        width: '100%',
        marginVertical: 3,
    },
    image: {
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
