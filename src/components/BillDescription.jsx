import { StyleSheet, Text, View, Pressable, TextInput, TextProps, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import LinearGradient from 'react-native-linear-gradient';
import { fontScale, scale } from "../utils/appScale";
import { colors } from "../constant/colors";
import { fonts } from "../constant/fonts";
import Button from "./button";
import { images } from "../constant/images";



const BillDescription = ({
    description,
    isBookmarked,
    isLoved,
    onBookmark,
    onLove,
    onClose,
    ...rest
}) => {

    return (
        <View >
            <View style={{ paddingBottom: 120, paddingTop: scale(30) }} >
                {/* Description Section */}
                <View style={{ gap: 12 }}>
                    <Text style={{ color: colors.text_v1, fontFamily: fonts.light, fontWeight: "300", fontSize: scale(13) }}>
                        {description || "No description available"}
                    </Text>
                </View>

                <View style={{ marginTop: 24 }}>
                    <Text style={styles.sectionTitle}>Comments</Text>
                    <TextInput
                        multiline={true}
                        placeholder="Add your comment..."
                        placeholderTextColor="#A7ACC5"
                        style={styles.commentInput}
                    />
                    <Button title="Submit" style={{ marginTop: 12, height: scale(40) }} />

                    {/* Sample Comments */}
                    <View style={{ marginTop: 24, gap: 12 }}>
                        <View style={styles.commentContainer}>
                            <View style={{
                                padding: 5,
                                width: 60,
                                height: 60,
                                marginRight: 10,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Image source={{ uri: "https://picsum.photos/200/300" }} style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 50
                                }} />
                            </View>
                            <View style={{ width: "85%" }}>
                                <Text style={styles.commentAuthor}>Richard Blumenthal</Text>
                                <Text style={styles.commentText}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>



                <View style={styles.bottomActions}>
                    {/* Close */}
                    <TouchableOpacity style={[styles.actionButton, styles.closeButton]}>
                        <Image
                            source={images.cross}
                            style={[styles.icons, { tintColor: colors.red }]}
                        />
                    </TouchableOpacity>

                    {/* Love */}
                    <TouchableOpacity style={[styles.actionButton, styles.loveButton]}>
                        <Image
                            source={images.heart2}
                            style={styles.icons}
                        />
                    </TouchableOpacity>

                    {/* Bookmark */}
                    <TouchableOpacity style={[styles.actionButton, {
                        backgroundColor: "#00000D",
                        borderColor: "#BFC4E0",
                    }]}>
                        <Image
                            source={images.bookmarks2}
                            style={styles.icons}
                        />
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: fontScale(20),
        color: "#000",
        fontFamily: fonts.semiBold,
        fontWeight: "600",
        marginBottom: 8,
    },
    commentInput: {
        backgroundColor: colors.input_v1,
        borderWidth: 1,
        borderRadius: 8,
        minHeight: 120,
        borderColor: colors.theme_v2,
        padding: 12,
        color: "#050A20",
        textAlignVertical: "top",
    },
    postButton: {
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    commentContainer: {
        backgroundColor: colors.bg_v1,
        borderRadius: 6,
        padding: 16,
        flexDirection: "row",
    },
    commentAuthor: {
        fontSize: fontScale(14),
        fontFamily: fonts.medium,
        fontWeight: "500",
        marginBottom: 4,
        color: colors.black,
    },
    commentText: {
        fontSize: fontScale(13),
        fontFamily: fonts.light,
        fontWeight: "400",
        marginBottom: 4,
        color: colors.text_v3,
    },
    bottomActions: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    closeButton: {
        backgroundColor: "#FAF5F5",
        borderColor: "#EDDEDD",
    },
    loveButton: {
        backgroundColor: "#2B47D3",
        borderColor: "#BFC4E0",
    },
    bookmarkedButton: {
        backgroundColor: "#0000000D",
        borderColor: "#BFC4E0",
    },
    icons: {
        width: scale(22),
        height: scale(22),
        resizeMode: "contain",
        tintColor: colors.theme_v1
    },
    commnetIcons: {
        width: scale(25),
        height: scale(25),
        resizeMode: "contain",
        tintColor: colors.theme_v1
    }
});

export default BillDescription;