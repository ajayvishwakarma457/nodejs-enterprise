# Mock AWS infrastructure for Node.js Enterprise Demo
provider "aws" {
  region = "us-east-1"
  access_key = "mock_access_key"
  secret_key = "mock_secret_key"
  skip_credentials_validation = true
  skip_requesting_account_id = true
  endpoints {
    s3 = "http://localhost:4566"
  }
}

resource "aws_s3_bucket" "demo_bucket" {
  bucket = "nodejs-enterprise-demo-bucket"
}

# Example: Add mock EC2 for Kafka, Redis, MongoDB (for localstack/testing only)
resource "aws_instance" "kafka" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"
  tags = {
    Name = "kafka-mock"
  }
}

resource "aws_instance" "redis" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"
  tags = {
    Name = "redis-mock"
  }
}

resource "aws_instance" "mongodb" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"
  tags = {
    Name = "mongodb-mock"
  }
}
