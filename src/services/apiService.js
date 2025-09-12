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

export const updateUserDoc = async (uid, data) => {
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



export const getUserDoc = async (uid) => {

    console.log('uid', JSON.stringify(uid, null, 2))

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


export const apiServices = {
    createUserDoc,
    updateUserDoc,
    getUserDoc
};