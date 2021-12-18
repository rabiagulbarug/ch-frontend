import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";

export const HomeScreen = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3002/company').then(res => res.json()).then(res => {
            setCompanies(res.companies);
        });
    }, []);
    return (
        <>
            <div className="row mx-0">
                {companies.map(company => (
                    <div className="col-md-4 col-12" key={company._id}>
                        <Card>
                            <Card.Header>
                                <Card.Title as={Link} to={`/company-detail/${company._id}`}>
                                    {company.title}
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Link to={`/company-detail/${company._id}`}>
                                    <Card.Img src={company.avatar ?? '/no-image.png'} />
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}