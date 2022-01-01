import React, { FC } from "react";
import { AppProps } from "next/app";
import { wrapper } from "../store";

import styles from './index.module.scss';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
    <div  className={styles.center}>
        <Component {...pageProps} />
    </div>
);

export default wrapper.withRedux(WrappedApp);
