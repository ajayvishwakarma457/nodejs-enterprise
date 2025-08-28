# AWS Configuration Checklist for Node.js Enterprise Application

This file lists all the AWS configurations typically required for deploying and running this application in a cloud environment.

---

## 1. Compute & Networking
- **EC2 Instances**: For custom compute workloads or bastion hosts
- **Elastic Load Balancer (ELB/ALB/NLB)**: For routing traffic to services
- **VPC**: Custom Virtual Private Cloud for network isolation
- **Subnets**: Public and private subnets for service segregation
- **Security Groups**: Firewall rules for EC2, RDS, etc.
- **IAM Roles & Policies**: For service permissions and access control
- **Auto Scaling Groups**: For scaling EC2 instances
- **Elastic IPs**: For static IP assignment

## 2. Containers & Orchestration
- **ECS (Elastic Container Service)** or **EKS (Elastic Kubernetes Service)**: For container orchestration
- **ECR (Elastic Container Registry)**: For storing Docker images
> **Note:** ECS/EKS/ECR are recommended for scalable, automated deployments, but can be costly. As an alternative, you can use EC2 instances to run all services directly, which is more cost-effective for small teams or local development. Both approaches are supported by this application.

## 3. Databases & Storage
- **RDS (Relational Database Service)**: For managed SQL databases (if not using MongoDB Atlas)
- **DocumentDB**: Managed MongoDB-compatible database
- **ElastiCache (Redis)**: Managed Redis for caching
- **S3 Buckets**: For file/object storage, logs, backups

## 4. Messaging & Streaming
- **Amazon MSK (Managed Streaming for Kafka)**: Managed Kafka clusters
- **SQS (Simple Queue Service)**: For message queuing
- **SNS (Simple Notification Service)**: For notifications

## 5. Monitoring & Logging
- **CloudWatch**: Metrics, logs, alarms, dashboards
- **X-Ray**: Distributed tracing
- **CloudTrail**: API call logging
- **AWS Config**: Resource configuration tracking

## 6. Secrets & Configuration Management
- **Secrets Manager**: Store and manage secrets (DB passwords, API keys)
- **Parameter Store (SSM)**: Store configuration parameters

## 7. Networking & CDN
- **Route 53**: DNS management
- **API Gateway**: Managed API endpoints
- **CloudFront**: CDN for static assets

## 8. DevOps & CI/CD
- **CodeBuild**: Build automation
- **CodePipeline**: CI/CD pipeline orchestration
- **CodeDeploy**: Deployment automation

## 9. Other Useful Services
- **Lambda**: Serverless functions for automation and event handling
- **Elastic Beanstalk**: Simplified app deployment (optional)
- **Certificate Manager (ACM)**: SSL/TLS certificate management
- **WAF (Web Application Firewall)**: Security protection

---

## Example: Environment Variables & Secrets
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- Database connection strings
- Kafka broker endpoints
- Redis endpoints
- S3 bucket names
- API keys and secrets

---

For detailed setup, see the Terraform scripts in the `terraform/` directory and service-specific documentation.

---

## Credentials Required for Local Development

To run the application locally, developers typically need to provide the following AWS credentials and configuration values:

- `AWS_ACCESS_KEY_ID`: Your AWS access key (for programmatic access)
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
- `AWS_REGION`: The AWS region to use (e.g., `us-east-1`)
- (Optional) `AWS_SESSION_TOKEN`: If using temporary credentials
- S3 bucket names (if uploading/downloading files)
- Database connection strings (if using AWS-hosted databases)
- Kafka broker endpoints (if using Amazon MSK)
- Redis endpoints (if using ElastiCache)
- Any other service-specific API keys or secrets

These credentials are usually set in a `.env` file or as environment variables before starting the application. Make sure you do not commit sensitive credentials to version control.
