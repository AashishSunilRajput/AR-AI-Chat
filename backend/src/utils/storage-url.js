export function getStorageUrl(storagePath) {

    if (!storagePath) {
        return null;
    }

    return (
        process.env.STORAGE_PUBLIC_URL +
        storagePath
    );
}