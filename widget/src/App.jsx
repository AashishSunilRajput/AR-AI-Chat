import { useWidget } from "./context/WidgetContext";

import ChatWidget from "./components/Chat/ChatWidget";

function App() {

    const {

        loading,

        config,

        visitor,

        conversationId

    } = useWidget();

    if (loading) {

        return (

            <h2>

                Loading Widget...

            </h2>

        );

    }

    console.log(config);

    console.log(visitor);

    console.log(conversationId);

    return (

        <ChatWidget />

    );

}

export default App;