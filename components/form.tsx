// import { API_URL } from "@/utils/api";
import { Input, Button, Card, Title, Stack } from "@mantine/core";
import React, { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    amount: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation rules
    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.amount) {
      newErrors.amount = 'Donation Amount is required';
    } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 1000) {
      newErrors.amount = 'Donation Amount must be a numeric value greater than 1000';
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      // If no errors, you can submit the form or take other actions here
      console.log('Form submitted successfully');
    } else {
      // If there are errors, set them in the state
      setErrors(newErrors);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <Card withBorder shadow="xs" p="xl" bg="cyan.2">
      <Title order={1} color="blue">
        Donate
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack spacing={"xs"}>
          <Input.Wrapper>
            <Input.Label>First Name</Input.Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <Input.Error>{errors.firstName}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Last Name</Input.Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <Input.Error>{errors.lastName}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Email</Input.Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input.Error>{errors.email}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Donation Amount</Input.Label>
            <Input
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
            <Input.Error>{errors.amount}</Input.Error>
          </Input.Wrapper>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Card>
  );
}
