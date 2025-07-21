import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
        <section className="team-section py-5 text-center">
            <div>
                <p className="team-subtitle text-uppercase text-muted mb-2">
                    Nhân viên Head Turner
                </p>
                <h2 className="team-title fw-bold mb-4">
                    Những nghệ sĩ làm tóc
                </h2>

                <Row className="g-4">
                    {teamMembers.slice(0, 4).map((member) => (
                        <Col key={member.id} xs={6} md={3}>
                            <div className="team-card bg-white rounded shadow-sm p-3 h-100">
                                <div className="team-image position-relative mb-3">
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <div className="team-info">
                                    <h5 className="fw-bold">
                                        {member.name.toUpperCase()}
                                    </h5>
                                    <p className="text-muted mb-0">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
};

export default TeamMember;
