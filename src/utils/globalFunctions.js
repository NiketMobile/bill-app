import { persistor } from "../redux/store";
import { MMKV } from 'react-native-mmkv';


export const getHitSlop = (size) => ({
    top: size,
    bottom: size,
    left: size,
    right: size,
});

export const clearAppStorage = async () => {
    try {
        const storage = new MMKV();
        // Clear MMKV data
        storage.clearAll();
        // Purge Redux Persist state
        await persistor.purge();
        console.log("✅ All app storage cleared");
    } catch (error) {
        console.error("❌ Failed to clear storage:", error);
    }
};