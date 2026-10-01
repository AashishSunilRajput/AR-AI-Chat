export const getStorageUrl = (
    path?: string | null
) => {

    if (!path) {
        return null;
    }

    if (path.startsWith("http")) {
        return path;
    }

    const storageUrl =
        process.env.NEXT_PUBLIC_STORAGE_PUBLIC_URL;

    if (!storageUrl) {
        return path;
    }

    return `${storageUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};