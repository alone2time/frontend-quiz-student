"use client";
// import { API_URL } from "../utils/api";
//import { type Donation } from "@/utils/types";
import { Paper, Text, Stack, Group, Title, Card } from "@mantine/core";
import dayjs from "dayjs";
import React, { useState, useEffect } from 'react';

export default function Donation() {
  const [donationData, setDonationData] = useState([]);
  const [totalDonation, setTotalDonation] = useState(0);

  useEffect(() => {
    // Fetch donation data from the server
    fetch('https://donation-server-production.up.railway.app/donation')
      .then((response) => response.json())
      .then((data) => {
        // Update the component state with the fetched data
        setDonationData(data);

        // Calculate the total donation amount
        const total = data.reduce((ac, donat) => ac + donat.amount, 0);
        setTotalDonation(total);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Card withBorder shadow="xs" bg="gray.3">
      <Group mb={20}>
        <Title order={1} color="gray">
          Total
        </Title>
        <Title order={1} variant="gradient">
          {totalDonation}
        </Title>
        <Title order={1} color="gray">
          THB
        </Title>
      </Group>
      <Stack>
        {donationData.map((donation) => (
          <Paper key={donation.id} shadow="xs" p="md">
            <Group>
              <Text>{donation.firstName}</Text>
              <Text>{donation.lastName}</Text>
              <Text>{donation.email}</Text>
              <Text>{donation.amount}</Text>
              <Text>{dayjs(donation.time).format("D-MMM HH:mm:ss")}</Text>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Card>
  );
}
