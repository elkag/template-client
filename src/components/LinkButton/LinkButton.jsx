import React from 'react';
import styles from './link-button.module.css';
import { Link } from 'react-router-dom';

const LinkButton = ({href, title, type, onClick}) => {
    return (
        <div className={styles[`${type}-list-item`]}>
            <Link to={href} onClick={onClick}>
                {title}
            </Link>

        </div>
    )
}

export default LinkButton;