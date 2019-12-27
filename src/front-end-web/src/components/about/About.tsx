import React from 'react';
import './About.css';
import img from '../img/bg.jpg';



const members = [
    {
        img: img,
        name: 'Nguyen Tuan',
        age: 26,
        gender: 'Male',
        position: 'Instructor'
    },
    {
        img: img,
        name: 'Le Khanh Sinh',
        age: 22,
        gender: 'Male',
        position: 'Leader'
    },
    {
        img: img,
        name: 'Bui Nguyen Thang',
        age: 22,
        gender: 'Male',
        position: 'Member'
    },
    {
        img: img,
        name: 'Nguyen Tien Hoang',
        age: 25,
        gender: 'Male',
        position: 'Member'
    }
]
class About extends React.Component {
    render() {
        const showMembers = members.map((member: any, index: any) => {
            return <div key={index} className="col-md-3 img-animation">
                <div>
                    <img src={img} alt="" />
                    <p><span>Name : </span>{member.name}</p>
                    <p><span>Age : </span>{member.age}</p>
                    <p><span>Gender : </span>{member.gender}</p>
                    <p><span>Position : </span>{member.position}</p>
                </div>
            </div>
        });
        return (
            <div className="container about-page">
                <h1>
                    My group's name is Group SHT
                </h1>
                <div className="row py-3">
                    {showMembers}
                </div>
            </div>
        );
    }
}

export default About;
