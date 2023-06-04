import React, { useState } from 'react';
import styles from './Modal.module.css';
import { RiCloseLine } from 'react-icons/ri';
import { IoMdArrowBack } from 'react-icons/io';

const ListItem = ({ item, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        onClick(item);
    };

    return (
        <div
            style={{
                position: 'relative',
                margin: '10px',
                cursor: 'pointer',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <img src={item.thumbnailAccessURI} alt='plantPicture' style={{ width: '200px', height: '200px' }} />
            {isHovered && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '5px',
                    }}
                >
                    <p>{item.scientificName}</p>
                </div>
            )}
        </div>
    );
};

const SingleItemModal = ({ item, onBack, onClose }) => {
    return (
        <>
            <div className={styles.darkBG} onClick={onBack} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <button className={styles.backBtn} onClick={onBack}>
                        <IoMdArrowBack />
                    </button>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <RiCloseLine />
                    </button>
                    <div className={styles.modalContent}>
                        <h5 className={styles.title}>{item.scientificName}</h5>
                        <div className={styles.itemDetails}>
                            <div className={styles.additionalInfo}>
                                <p className={styles.subtitle}>Taxonomy</p>
                                <li>Kingdom: {item.kingdom}</li>
                                <li>Phylum: {item.phylum}</li>
                                <li>Class: {item.class}</li>
                                <li>Order: {item.order}</li>
                                <li>Family: {item.family}</li>
                                <li>Genus: {item.genus}</li>
                                <p className={styles.subtitle}>Location</p>
                                <li>Locality: {item.locality}</li>
                                <li>Municipality: {item.municipality}</li>
                                <li>County: {item.county}</li>
                                <li>State: {item.stateProvince}</li>
                                <li>Country: {item.country}</li>
                                <p className={styles.subtitle}>Additional Info</p>
                                <li>Owner: {item.Owner}</li>
                            </div>
                            <div className={styles.imageContainer}>
                                <div>
                                    <img src={item.thumbnailAccessURI} alt='plantPicture' className={styles.image} />
                                    <p className={styles.recordedBy}>Recorded By: {item.recordedBy}</p>
                                    <p>On: {item.eventDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default function MapModal({ setIsOpen, modalData, county }) {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleBackClick = () => {
        setSelectedItem(null);
    };

    if (selectedItem) {
        return <SingleItemModal item={selectedItem} onBack={handleBackClick} onClose={() => setIsOpen(false)}/>;
    }

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
                    <div className={styles.modalContent} style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {modalData.map((item, index) => (
                            <ListItem key={index} item={item} onClick={handleItemClick} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
