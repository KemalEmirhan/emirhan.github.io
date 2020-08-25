import React from 'react';
import styles from '../styles/fileList.module.scss';

const FileList = () => {
    return (
        <section className={styles.list}>
            <div className={styles.list_header}>
                <h4>More informations about me</h4>
            </div>
            <div className={styles.list_wrapper}>
                <ul className={styles.list_wrapper__content}>
                    <li className={styles.list_wrapper__content_item}>
                        <img src="/file-empty.svg" alt="File" />
                        <a href="https://github.com/KemalEmirhan" target="_blank" rel="noopener noreferrer">
                            <span>
                                Github
                            </span>
                        </a>
                    </li>
                    <li className={styles.list_wrapper__content_item}>
                        <img src="/file-empty.svg" alt="File" />
                        <a href="https://www.linkedin.com/in/emirhan-kemal-kösem-259569b3/" target="_blank" rel="noopener noreferrer">
                        <span>LinkedIn</span></a>
                    </li>
                    <li className={styles.list_wrapper__content_item}>
                        <img src="/file-empty.svg" alt="File" />
                        <a href="https://medium.com/@emirhankemalkosem" target="_blank" rel="noopener noreferrer"><span>Medium</span></a>
                    </li>
                    <li className={styles.list_wrapper__content_item}>
                        <img src="/file-empty.svg" alt="File" />  
                        <a href="https://twitter.com/KsemEmir" target="_blank" rel="noopener noreferrer"><span>Twitter</span></a>  
                    </li>
                    <li className={styles.list_wrapper__content_item}>
                        <img src="/file-empty.svg" alt="File" />
                        <a href="/resume.pdf" rel="noopener noreferrer" download><span>Resume</span></a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default FileList;