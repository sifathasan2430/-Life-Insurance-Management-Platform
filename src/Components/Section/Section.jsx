import React from 'react';
import Container from '../Container/Container';

const Section = ({children,className}) => {
    return (
        <section className={`py-16 md:py:24 ${className}`}>
            <Container>{children}</Container>
        </section>
    );
};

export default Section;