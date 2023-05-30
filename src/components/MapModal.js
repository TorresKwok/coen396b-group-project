import React from 'react';
import styles from './Modal.module.css'
import { RiCloseLine } from 'react-icons/ri'
import { useState } from 'react'


const ListItem = ({ item }) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <li><a href={item.references}>{item.scientificName}</a></li>
            <img src={item.thumbnailAccessURI} alt='plantPicture'/>
        </div>
    )
}

export default function MapModal({ setIsOpen, modalData, county }) {

    // const map = new Map(Object.entries(modalData));
    // console.log(map)

    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>{county} County</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        <RiCloseLine />
                    </button>
                    <div className={styles.modalContent}>
                        {modalData.map((item, index) => (
                            <ListItem key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}