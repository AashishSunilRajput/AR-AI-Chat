class UrlNormalizer {


    normalize(url) {

        try {

            const parsed =
                new URL(url);


            parsed.hash = "";


            parsed.search = "";


            let pathname =
                parsed.pathname;


            if (
                pathname.length > 1 &&
                pathname.endsWith("/")
            ) {

                pathname =
                    pathname.slice(
                        0,
                        -1
                    );

            }


            return (
                parsed.origin +
                pathname
            );


        }
        catch {

            return url;

        }

    }


}


export default new UrlNormalizer();