import React from 'react'

const Timetable = ({ state, setState }) => {

    const updateTimetable = (target) => {
        setState({
            ...state,
            timetable: {
                monday: state.timetable.monday,
                tuesday: state.timetable.tuesday,
                wednesday: state.timetable.wednesday,
                thursday: state.timetable.thursday,
                friday: state.timetable.friday,
                saturday: state.timetable.saturday,
                sunday: state.timetable.sunday,
                [target.name]: target.value,
            }
        })
    }

    return (
        <div className="object-input">
            <h2>Timetable:</h2>
            <div><label>Monday:</label><input type="text" name="monday" onChange={(e) => updateTimetable(e.target)} /></div>
            <div><label>Tuesday:</label><input type="text" name="tuesday" onChange={(e) => updateTimetable(e.target)} /></div>
            <div><label>Wednesday:</label><input type="text" name="wednesday" onChange={(e) => updateTimetable(e.target)} /></div>
            <div><label>Thursday:</label><input type="text" name="thursday" onChange={(e) => updateTimetable(e.target)} /></div>
            <div><label>Friday:</label><input type="text" name="friday" onChange={(e) => updateTimetable(e.target)} /></div>
            <div><label>Saturday:</label><input type="text" name="saturday" onChange={(e) => updateTimetable(e.target)} /></div>
            <div><label>Sunday:</label><input type="text" name="sunday" onChange={(e) => updateTimetable(e.target)} /></div>
        </div>
    )
}

export default Timetable
