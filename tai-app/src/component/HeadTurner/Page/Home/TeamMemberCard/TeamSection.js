import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./TeamSection.css";

const TeamMemberCard = ({ name, imageUrl, onClick }) => (
    <div className="team-member-card" onClick={onClick}>
        <div className="overlay"></div>
        <div className="card-image-wrapper">
            <img src={imageUrl} alt={name} className="member-image" />
        </div>
        <div className="card-overlay">
            <span className="member-name">{name}</span>
            <button className="add-button">+</button>
        </div>
    </div>
);

const TeamSection = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetch("https://6871fc0376a5723aacd3429e.mockapi.io/doingu");
                const data = await res.json();
                setTeamMembers(data);
            } catch (error) {
                console.error("Lỗi fetch dữ liệu:", error);
            }
        };
        getProduct();
    }, []);

    const selectedMember = teamMembers.find((m) => String(m.id) === String(selectedId));

    return (
        <div className="team-section">
            <Row>
                <Col lg={3} md={12} xs={12}>
                    <div className="team-header text-center">
                        <p className="subtitle">ĐỘI NGŨ</p>
                        <h2 className="title">TAY NGHỀ CAO TẠI HEAD TURNER</h2>
                    </div>
                </Col>

                {teamMembers.map((member) => (
                    <Col key={member.id} lg={3} md={4} xs={6}>
                        <TeamMemberCard name={member.name} imageUrl={member.imageUrl} onClick={() => setSelectedId(member.id)} />
                    </Col>
                ))}

                <Col lg={6} md={4} xs={6}>
                    <div className={`see-more-card ${selectedMember ? "show" : ""}`}>
                        {selectedMember ? (
                            <>
                                <div className="see-more-info">
                                    <p className="memberName">Hi I'M {selectedMember.name}</p>
                                    <p className="member-bio">{selectedMember.bio}</p>
                                </div>
                                <div className="see-more-icon">
                                    <div className="photo">
                                        <img src={selectedMember.imageUrl} alt={selectedMember.name} />
                                        <div className="glow-wrap">
                                            <i className="glow"></i>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="click-me">
                                <p className="memberName">Click a card to see more</p>
                                <p className="member-bio">Select a team member to view details.</p>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default TeamSection;
