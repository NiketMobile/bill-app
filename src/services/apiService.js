import firestore from '@react-native-firebase/firestore';
// import { getApp } from '@react-native-firebase/app';
// import {
//     getFirestore,
//     doc,
//     getDoc,
//     setDoc,
//     updateDoc,
//     collection,
//     getDocs,
//     increment,
//     serverTimestamp,
// } from 'firebase/firestore';
// import { getAuth } from '@react-native-firebase/auth';

// const firebaseConfig = {

// };
// firebase.initializeApp(firebaseConfig);
// const app = getApp();                
// const db  = getFirestore(app); 


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


const saveDownSwipe = async (uid, bill_id) => {
    if (!uid || !bill_id) {
        console.log('Missing uid or bill_id');
        return { success: false, error: 'Missing uid or bill_id' };
    }
    try {
        await firestore()
            .collection('Users')
            .doc(uid)
            .collection('downSwipes')
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


const incrementSwipeCount = async (rawBillId, direction, data) => {
    try {

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


const getDataByDocumentById = async (collectionName, docId) => {
    try {
        if (!collectionName || !docId) {
            throw new Error('Both collection name and document id are required');
        }
        const docSnap = await firestore()
            .collection(collectionName)
            .doc(docId)
            .get();

        if (!docSnap.exists) return null;

        return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
        console.error(`getDocumentById error [${collectionName}/${docId}]:`, error);
        return null;
    }
};



const checkDocumentIdIsPresent = async (collectionName, docId) => {
    try {
        if (!collectionName || !docId) {
            throw new Error('Both collection name and document id are required');
        }

        const docRef = firestore().collection(collectionName).doc(docId);
        const snapshot = await docRef.get();

        console.log('snapshot--->', JSON.stringify(snapshot, null, 2))
        console.log('docRef--->', JSON.stringify(docRef, null, 2))

        if (!snapshot.exists) {
            // Document does not exist
            return null;
        }

        // Return the document data with the id
        return { id: snapshot.id, ...snapshot.data() };
    } catch (error) {
        console.error(`checkDocumentIdIsPresent error [${collectionName}/${docId}]:`, error);
        return null;
    }
};


const addToLiked = async (uid, bill_id) => {
    if (!uid || !bill_id) {
        return { success: false, error: 'Missing uid or bill_id' };
    }

    try {
        const likedRef = firestore()
            .collection('Users')
            .doc(uid)
            .collection('likedBills');

        // 🔎 Check if a doc with this billId already exists
        const existingSnap = await likedRef
            .where('billId', '==', bill_id)
            .limit(1)
            .get();

        if (!existingSnap.empty) {
            // ✅ Already liked, don’t add again
            return { success: true, alreadyExists: true };
        }

        // ➕ Add new liked bill
        await likedRef.add({
            billId: bill_id,
            timestamp: firestore.FieldValue.serverTimestamp(),
        });

        return { success: true, alreadyExists: false };
    } catch (error) {
        console.error('saveLeftSwipe error:', error);
        return { success: false, error: error.message };
    }
};


const addLikedAction = async (uid, bill_id) => {
    if (!uid || !bill_id) {
        console.log('Missing uid or bill_id');
        return { success: false, error: 'Missing uid or bill_id' };
    }
    try {
        await firestore()
            .collection('Users')
            .doc(uid)
            .collection('likedBills')
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


const addBookmarkAction = async (uid, bill_id) => {
    if (!uid || !bill_id) {
        console.log('Missing uid or bill_id');
        return { success: false, error: 'Missing uid or bill_id' };
    }
    try {
        await firestore()
            .collection('Users')
            .doc(uid)
            .collection('bookmarkedBills')
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

const getBookmarkedBills = async (uid) => {
    if (!uid) return { success: false, error: 'Missing uid' };

    try {
        const snapshot = await firestore()
            .collection('Users')
            .doc(uid)
            .collection('bookmarkedBills')
            .orderBy('timestamp', 'desc')   // optional, newest first
            .get();

        // Map each document to an object with its ID and data
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching bookmarked bills:', error);
        return { success: false, error: error.message };
    }
};


const getLikedBills = async (uid) => {
    if (!uid) return { success: false, error: 'Missing uid' };

    try {
        const snapshot = await firestore()
            .collection('Users')
            .doc(uid)
            .collection('likedBills')
            .orderBy('timestamp', 'desc')   // optional, newest first
            .get();

        // Map each document to an object with its ID and data
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching bookmarked bills:', error);
        return { success: false, error: error.message };
    }
};


export const apiServices = {
    createUserDoc,
    updateUserDoc,
    getUserDoc,
    getCollectionDocs,
    saveRightSwipe,
    saveLeftSwipe,
    incrementSwipeCount,
    saveDownSwipe,
    getDataByDocumentById,
    checkDocumentIdIsPresent,
    addLikedAction,
    addBookmarkAction,
    getBookmarkedBills,
    getLikedBills
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
