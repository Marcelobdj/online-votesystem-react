import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footer}>
            &copy; {new Date().getFullYear()} Swot Academy Awards. Made by _<i>keep</i>, All rights reserved.
        </div>
    );
};

export default Footer;