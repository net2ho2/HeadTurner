import React, { useEffect, useState } from "react";
import "./TeamMember.css";

const TeamMember = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        fetch("https://6871fc0376a5723aacd3429e.mockapi.io/doingu")
            .then((res) => res.json())
            .then((data) => setTeamMembers(data))
            .catch((err) => console.error("Error fetching team data:", err));
    }, []);

    return (
        <section className="team-section">
            <p className="team-subtitle">NHÂN VIÊN HEAD TURNER</p>
            <h2 className="team-title">NHỮNG NGHỆ SĨ LÀM TÓC</h2>

            <div className="team-grid">
                {teamMembers.slice(0, 4).map((member) => (
                    <div className="team-card" key={member.id}>
                        <div className="team-image">
                            <img src={member.imageUrl} alt={member.name} />
                            <button className="plus-btn">+</button>
                        </div>
                        <div className="team-info">
                            <h4>{member.name.toUpperCase()}</h4>
                            <p>{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamMember;
