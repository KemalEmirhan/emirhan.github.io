import React from 'react';
import styles from '../styles/fileList.module.scss';

const FileList = () => {
    return (
        <section className={styles.list}>
            <div className={styles.list_header}>
                <h4>More informations about me</h4>
            </div>
            <ul className={styles.list_content}>
                <li className={styles.list_content__item}>Github</li>
                <li className={styles.list_content__item}>LinkedIn</li>
                <li className={styles.list_content__item}>Medium</li>
                <li className={styles.list_content__item}>Twitter</li>
                <li className={styles.list_content__item}>Instagram</li>
                <li className={styles.list_content__item}>Gmail</li>
            </ul>
        </section>
    )
}

export default FileList;