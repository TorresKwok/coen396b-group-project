import React from 'react'
import { useState } from 'react'
import './CactiSelectPage.css'

export default function CactiSelectPage() {
    const [location, setLocation] = useState('');
    const [portable, setPortable] = useState(false);
    const [flowering, setFlowering] = useState(false);
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handlePortableChange = (e) => {
        setPortable(e.target.checked);
    };

    const handleOtherFieldChange = (e) => {
        setFlowering(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform further actions with the submitted data
        console.log('Submitted location:', location);
        console.log('Portable:', portable);
        console.log('Other field:', flowering);
    };

    return (
        <div className='container'>
            <h2>Select Cacti Preferences</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={handleLocationChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="portable">Potable Cacti:</label>
                    <input
                        type="checkbox"
                        id="potable"
                        checked={portable}
                        onChange={handlePortableChange}
                    />
                </div>
                <div>
                    <label htmlFor="otherField">Flowering:</label>
                    <input
                        type="checkbox"
                        id="flowering"
                        value={flowering}
                        onChange={handleOtherFieldChange}
                    />
                </div>
                <button type="submit" className='submitButton' >Submit</button>
            </form>
        </div>
    )
}
