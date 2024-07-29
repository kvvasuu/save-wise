<template>
  <div class="wrapper">
    <div class="container">
      <div class="inner">
        <header>
          <h1>Terms and Conditions</h1>
          <div class="intro">
            Welcome to Save Wise, an online platform that allows users to manage
            electronic piggy banks. These Terms and Conditions govern your use
            of our website and services. By accessing or using Save Wise, you
            agree to be bound by these Terms and Conditions. If you do not agree
            with any part of these Terms and Conditions, please do not use our
            services.
          </div>
          <hr />
        </header>
        <div class="content">
          <h3>1. Definitions</h3>
          <ul>
            <li>"User" refers to anyone who accesses or uses Save Wise.</li>
            <li>"We," "Us," "Our" refers to the operators of Save Wise.</li>
            <li>
              "Service" refers to the functionalities provided by Save Wise to
              manage electronic piggy banks.
            </li>
          </ul>
          <h3>2. Use of the Service</h3>
          <ul>
            <li>
              Users must be at least 18 years old or have parental consent to
              use the service.
            </li>
            <li>
              Users must provide accurate and complete information when creating
              an account.
            </li>
            <li>
              Users are responsible for maintaining the confidentiality of their
              account credentials and for all activities that occur under their
              account.
            </li>
          </ul>
          <h3>3. Electronic Piggy Bank Management</h3>
          <ul>
            <li>
              Users can create and manage electronic piggy banks for saving
              money.
            </li>
            <li>
              The service allows users to set savings goals and track progress.
            </li>
            <li>
              We do not hold or transfer actual funds; the electronic piggy bank
              is a virtual tool to assist with financial management.
            </li>
          </ul>
          <h3>4. User Conduct</h3>
          <ul>
            <li>
              Users agree not to use the service for any unlawful or prohibited
              activities.
            </li>
            <li>
              Users must not engage in any behavior that could harm the service,
              other users, or third parties.
            </li>
          </ul>
          <h3>5. Intellectual Property</h3>
          <ul>
            <li>
              All content and materials available on Save Wise, including but
              not limited to text, graphics, logos, and software, are the
              property of Save Wise and are protected by applicable intellectual
              property laws.
            </li>
            <li>
              Users are granted a limited, non-exclusive, and non-transferable
              license to access and use the service for personal purposes.
            </li>
          </ul>
          <h3>6. Privacy Policy</h3>
          <ul>
            <li>
              Our Privacy Policy, which describes how we collect, use, and
              protect your personal information, is incorporated into these
              Terms and Conditions by reference. By using the service, you agree
              to the terms of our Privacy Policy.
            </li>
          </ul>
          <h3>7. Limitation of Liability</h3>
          <ul>
            <li>
              Save Wise is provided on an "as-is" and "as-available" basis. We
              make no warranties, express or implied, regarding the service.
            </li>
            <li>
              We shall not be liable for any direct, indirect, incidental,
              special, or consequential damages arising out of or in connection
              with your use of the service.
            </li>
          </ul>
          <h3>8. Termination</h3>
          <ul>
            <li>
              We reserve the right to terminate or suspend your account at our
              discretion, without notice, for conduct that we believe violates
              these Terms and Conditions or is harmful to other users or third
              parties.
            </li>
            <li>
              You may terminate your account at any time by contacting us.
            </li>
          </ul>
          <h3>9. Changes to the Terms and Conditions</h3>
          <ul>
            <li>
              We may update these Terms and Conditions from time to time. The
              latest version will be posted on our website with the effective
              date. Your continued use of the service after any changes
              indicates your acceptance of the new Terms and Conditions.
            </li>
          </ul>
          <h3>10. Governing Law</h3>
          <ul>
            <li>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of Poland, without regard to its conflict
              of law principles.
            </li>
          </ul>
          <h3>11. Contact Information</h3>
          <ul>
            <li>
              If you have any questions about these Terms and Conditions, please
              contact us at <a href="https://kwasu.pl/">kwasu.pl</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.wrapper {
  width: 100dvw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  width: 60rem;
  aspect-ratio: 6 / 4;
  border-radius: 1.6rem;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  box-shadow: 0.3rem 0.3rem 1rem #1e24384f;
  color: #1e2438;
  .inner {
    overflow: auto;
    aspect-ratio: 6 / 4;
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      h1 {
        font-weight: 900;
        color: #6485ff;
      }
      .intro {
        margin: 0 2rem;
      }
      hr {
        border: 0;
        height: 1px;
        background-image: -webkit-linear-gradient(
          left,
          #f0f0f0,
          #8c8b8b,
          #f0f0f0
        );
        background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
        background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
        background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
        width: 90%;
        margin: 1rem 0;
      }
    }
    .content {
      display: flex;
      align-items: start;
      justify-content: flex-start;
      flex-direction: column;
      width: 90%;
      h3 {
        margin: 0;
        color: #1e2438;
      }
      ul {
        list-style-type: circle;
      }
    }
    a {
      width: 60%;
      margin: 2rem 0;
      transition: all 0.2s ease;
      text-decoration: none;
      color: #6485ff;
      &:hover {
        color: #604eff;
      }
    }
    &::-webkit-scrollbar {
      width: 0.6rem;
    }
    &::-webkit-scrollbar-track {
      background: #f5f6fa00;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgb(100, 133, 255);
      background: linear-gradient(
        210deg,
        rgb(102, 129, 230) 0%,
        rgb(84, 86, 223) 100%
      );

      border-radius: 3px;
    }
  }
}
</style>
