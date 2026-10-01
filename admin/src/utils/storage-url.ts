export const getStorageUrl = (
    path?: string | null
) => {

    if (!path) {
        return null;
    }

    if (path.startsWith("http")) {
        return path;
    }

    return `${process.env.NEXT_PUBLIC_API_URL?.replace(
        "/api",
        ""
    )}${path}`;
};