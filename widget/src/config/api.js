const API_BASE_URL =
    window.ARAI_WIDGET_CONFIG?.apiUrl ||
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

const WIDGET_KEY =
    window.ARAI_WIDGET_CONFIG?.widgetKey ||
    import.meta.env.VITE_WIDGET_KEY ||
    "ar_live_test123456789";

export {
    API_BASE_URL,
    WIDGET_KEY
};