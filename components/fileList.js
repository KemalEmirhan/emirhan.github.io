import React from 'react';

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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
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