"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "@/components/layouts/Header";
import { useFaqsQuery } from "@/redux/slices/blog/blogApi";
import { Container } from "@mui/material";

export default function BasicAccordion() {
  const { data } = useFaqsQuery({});
  console.log(data);
  return (
    <div>
      <Header />
      <Container>
        <Typography variant="h5">Frequently ask question and answer</Typography>{" "}
        {data &&
          data.map((faqItem: any, index: number) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography>{faqItem?.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faqItem?.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </Container>
    </div>
  );
}
