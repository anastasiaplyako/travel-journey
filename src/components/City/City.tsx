import styles from "../../pages/home/Home.module.scss";
import Autocomplete from "../Autocomplete/Autocomplete";
import React from "react";
import classNames from "classnames";

type TCityProps = {
    label: string;
    icon: string;
    onChange: (value: string) => void;
    value: string;
    textError: string;
    invisibleDivider?: boolean;
    isShowDelete?: boolean;
    onDelete?: (deletedIndex: number) => void;
    index?: number;
}

const City = ({ label, icon, onChange, value, textError, invisibleDivider = false, isShowDelete, onDelete, index }: TCityProps) => {
    return (
        <div className={styles.line}>
            <div className={styles.lineBlock}>
                <span className={styles.label}>{label}</span>
                <div className={styles.city}>
                    <div className={styles.map}>
                        <img src={icon} alt="icon" />
                        <div className={classNames(styles.divider, {
                            [styles.invisibleDivider]: invisibleDivider
                        })} />
                    </div>
                    <Autocomplete
                        onChange={onChange}
                        value={value}
                        errorText={textError}
                        onDelete={onDelete}
                        isShowDelete={isShowDelete}
                        index={index}
                    />
                </div>
            </div>
        </div>
    )
}

export default City;
