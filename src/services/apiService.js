import firestore from '@react-native-firebase/firestore';


// Create user document (first onboarding step)
const createUserDoc = async (userId, initialData = {}) => {
    try {
        await firestore()
            .collection('Users')
            .doc(userId)
            .set(initialData, { merge: true });
        console.log('✅ User doc created!');
        return { success: true };
    } catch (error) {
        console.error('❌ Error creating user doc:', error);
        return { success: false, error };
    }
};

// // Update user document (subsequent steps)
// const updateUserDoc = async (userId, updateData) => {
//     try {
//         await firestore()
//             .collection('Users')
//             .doc(userId)
//             .update(updateData);
//         console.log('✅ User updated with:', updateData);
//         return { success: true };
//     } catch (error) {
//         console.error('❌ Error updating user doc:', error);
//         return { success: false, error };
//     }
// };

const updateUserDoc = async (uid, data) => {
    try {
        await firestore()
            .collection('Users')
            .doc(uid)
            .set(data, { merge: true }); // merge will add/update only new fields
        return { success: true };
    } catch (error) {
        console.error('Error updating user doc:', error);
        return { success: false, error };
    }
};



const getUserDoc = async (uid) => {
    try {
        if (!uid) throw new Error("UID is required");
        const docSnapshot = await firestore()
            .collection('Users')
            .doc(uid)
            .get();
        if (!docSnapshot.exists) {
            return null; // user doc doesn't exist
        }
        return docSnapshot?.data(); // return the data
    } catch (error) {
        console.error('getUserDoc error:', error);
        return null;
    }
};


const getCollectionDocs = async (collectionName) => {
    try {
        if (!collectionName) throw new Error("Collection name is required");

        const snapshot = await firestore().collection(collectionName).get();

        if (snapshot?.empty) {
            return [];
        }

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return data;
    } catch (error) {
        console.error(`getCollectionDocs error [${collectionName}]:`, error);
        return [];
    }
};


const saveRightSwipe = async (uid, bill_id) => {
    if (!uid || !bill_id) {
        console.log('Missing uid or bill_id');
        return { success: false, error: 'Missing uid or bill_id' };
    }
    try {
        await firestore()
            .collection('Users')
            .doc(uid)
            .collection('rightSwipes')
            .add({
                billId: bill_id,
                timestamp: firestore.FieldValue.serverTimestamp(),
            });
        return { success: true };
    } catch (error) {
        console.error('Error saving right swipe:', error);
        return { success: false, error };
    }
};

// Save a LEFT swipe
const saveLeftSwipe = async (uid, bill_id) => {
    if (!uid || !bill_id) {
        console.log('Missing uid or bill_id');
        return { success: false, error: 'Missing uid or bill_id' };
    }
    try {
        await firestore()
            .collection('Users')
            .doc(uid)
            .collection('leftSwipes')
            .add({
                billId: bill_id,
                timestamp: firestore.FieldValue.serverTimestamp(),
            });
        return { success: true };
    } catch (error) {
        console.error('Error saving right swipe:', error);
        return { success: false, error };
    }
};


const incrementSwipeCountaa = async (rawBillId, direction) => {
    try {
        // basic validation
        if (rawBillId === undefined || rawBillId === null) {
            throw new Error('billId missing or null');
        }
        if (direction !== 'left' && direction !== 'right') {
            throw new Error('direction must be "left" or "right"');
        }

        // make sure it's a string and safe for use as a doc id
        const billId = String(rawBillId).trim();
        // replace slashes which would break path semantics
        const sanitizedId = billId.replace(/\//g, '_');

        console.log('incrementSwipeCount -> billId:', billId, 'sanitized:', sanitizedId, 'direction:', direction);

        const incrementLiked = direction === 'right' ? 1 : 0;
        const incrementDislike = direction === 'left' ? 1 : 0;
        const incrementNeutral = direction === 'down' ? 3 : 0;

        await firestore()
            .collection('SwipeSummary')        // consistent collection name
            .doc(sanitizedId)
            .add(
                {
                    billId,
                    liked: firestore.FieldValue.increment(incrementLiked),
                    disliked: firestore.FieldValue.increment(incrementDislike),
                    neutral: firestore.FieldValue.increment(incrementNeutral),
                    updatedAt: firestore.FieldValue.serverTimestamp(),
                    income_range: "",
                    religion: "",
                    marital_status: "",
                    veteran: "",
                    disability: ""
                },
                { merge: true }
            );

        console.log('incrementSwipeCount success for', sanitizedId);
        return { success: true };
    } catch (error) {
        console.error('Error updating swipe summary:', error);
        return { success: false, error };
    }
};


const incrementSwipeCount = async (rawBillId, direction, data) => {
    try {

        console.log('data--->', JSON.stringify(data, null, 2))

        if (!rawBillId) throw new Error('billId missing or null');

        // ✅ now allow 'down' in addition to left/right
        if (!['left', 'right', 'down'].includes(direction)) {
            throw new Error('direction must be "left", "right", or "down"');
        }

        const billId = String(rawBillId).trim();
        const sanitizedId = billId.replace(/\//g, '_');

        const incrementLiked = direction === 'right' ? 1 : 0;
        const incrementDisliked = direction === 'left' ? 1 : 0;
        const incrementNeutral = direction === 'down' ? 1 : 0; // 👈 count 1 per down swipe

        console.log('incrementLiked', JSON.stringify(incrementLiked, null, 2))

        // const data ={ 
        // income_range: data?.income_range || '',
        // disability: data?.disability || '',
        // marital_status: data?.marital_status || '',
        // race: data?.race || "",
        // religion: data?.religion || '',
        // veteran: data?.veteran || '',
        // political_affiliation: data?.political_affiliation || "",
        // sexual_orientation: data?.sexual_orientation || ""}

        const genderKey = data?.gender; // e.g., "01"
        const disabilityKey = data?.disability;
        const incomeRangeKey = data?.income_range;
        const maritalStatusKey = data?.marital_status;
        const raceKey = data?.race;
        const religionKey = data?.religion;
        const veteranKey = data?.veteran;
        const politicalAffiliationKey = data?.political_affiliation;
        const sexualOrientationKey = data?.sexual_orientation;


        await firestore()
            .collection('SwipeSummary')
            .doc(sanitizedId)
            .set(
                {
                    billId,
                    liked: firestore.FieldValue.increment(incrementLiked),
                    disliked: firestore.FieldValue.increment(incrementDisliked),
                    neutral: firestore.FieldValue.increment(incrementNeutral),
                    // updatedAt: firestore.FieldValue.serverTimestamp(),
                    // optional static fields
                    "gender_counts": {
                        [genderKey]: {
                            liked: firestore.FieldValue.increment(incrementLiked),
                            disliked: firestore.FieldValue.increment(incrementDisliked),
                            neutral: firestore.FieldValue.increment(incrementNeutral)
                        },
                    },
                    "disability_counts": {
                        [disabilityKey]: {
                            liked: firestore.FieldValue.increment(incrementLiked),
                            disliked: firestore.FieldValue.increment(incrementDisliked),
                            neutral: firestore.FieldValue.increment(incrementNeutral)
                        },
                    },
                    "income_range_counts": {
                        [incomeRangeKey]: {
                            liked: firestore.FieldValue.increment(incrementLiked),
                            disliked: firestore.FieldValue.increment(incrementDisliked),
                            neutral: firestore.FieldValue.increment(incrementNeutral)
                        },
                    },
                    "marital_status_counts": {
                        [maritalStatusKey]: {
                            liked: firestore.FieldValue.increment(incrementLiked),
                            disliked: firestore.FieldValue.increment(incrementDisliked),
                            neutral: firestore.FieldValue.increment(incrementNeutral)
                        },
                    },
                    "race_counts": {
                        [raceKey]: {
                            liked: firestore.FieldValue.increment(incrementLiked),
                            disliked: firestore.FieldValue.increment(incrementDisliked),
                            neutral: firestore.FieldValue.increment(incrementNeutral)
                        },
                    },
                    "religion_counts": {
                        [religionKey]: {
                            liked: firestore.FieldValue.increment(incrementLiked),
                            disliked: firestore.FieldValue.increment(incrementDisliked),
                            neutral: firestore.FieldValue.increment(incrementNeutral)
                        },
                    },
                    "veteran_counts": {
                        [veteranKey]: {
                            liked: firestore.FieldValue.increment(incrementLiked),
                            disliked: firestore.FieldValue.increment(incrementDisliked),
                            neutral: firestore.FieldValue.increment(incrementNeutral)
                        },
                    },
                    "political_affiliation_counts": {
                        [politicalAffiliationKey]: {
                            liked: firestore.FieldValue.increment(incrementLiked),
                            disliked: firestore.FieldValue.increment(incrementDisliked),
                            neutral: firestore.FieldValue.increment(incrementNeutral)
                        },
                    },
                    "sexual_orientation_counts": {
                        [sexualOrientationKey]: {
                            liked: firestore.FieldValue.increment(incrementLiked),
                            disliked: firestore.FieldValue.increment(incrementDisliked),
                            neutral: firestore.FieldValue.increment(incrementNeutral)
                        },
                    },
                },
                { merge: true }
            );


        console.log('incrementSwipeCount success for', sanitizedId, direction);
        return { success: true };
    } catch (error) {
        console.error('Error updating swipe summary:', error);
        return { success: false, error };
    }
};


export const apiServices = {
    createUserDoc,
    updateUserDoc,
    getUserDoc,
    getCollectionDocs,
    saveRightSwipe,
    saveLeftSwipe,
    incrementSwipeCount
};





// // 🔵 Right swipe = LIKE
// const handleSwipedRight = async (cardIndex) => {
//   const swipedBill = results[cardIndex];
//   if (!swipedBill?.bill_id) return;
//   await incrementSwipeCount(swipedBill.bill_id, 'right');
// };

// // 🔴 Left swipe = DISLIKE
// const handleSwipedLeft = async (cardIndex) => {
//   const swipedBill = results[cardIndex];
//   if (!swipedBill?.bill_id) return;
//   await incrementSwipeCount(swipedBill.bill_id, 'left');
// };

// // 🟢 Down swipe = NEUTRAL / SKIP
// const handleSwipedDown = async (cardIndex) => {
//   const swipedBill = results[cardIndex];
//   if (!swipedBill?.bill_id) return;
//   await incrementSwipeCount(swipedBill.bill_id, 'down');
// };
