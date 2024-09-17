import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 5rem 0;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.bg};
    h2 {
      font-size: 3rem;
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 2rem;
      font-weight: bold;
    }

    .container {
      margin-top: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .contact-form {
        background-color: #f9f9f9;
        padding: 3rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        max-width: 40rem;
        width: 100%;
        margin: auto;

        h3 {
          font-size: 2.4rem;
          color: ${({ theme }) => theme.colors.secondary};
          margin-bottom: 2rem;
        }

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 2rem;

          input,
          textarea {
            width: 100%;
            padding: 1.2rem;
            font-size: 1.2rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            transition: all 0.3s ease;
            outline: none;

            &:focus {
              border-color: ${({ theme }) => theme.colors.primary};
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            }
          }

          textarea {
            resize: none;
            height: 150px;
          }

          input[type="submit"] {
            background-color: ${({ theme }) => theme.colors.btn};
            color: white;
            border: none;
            border-radius: 5px;
            padding: 1.2rem;
            cursor: pointer;
            font-size: 1.4rem;
            font-weight: bold;
            text-transform: uppercase;
            transition: all 0.3s ease;

            &:hover {
              background-color: ${({ theme }) => theme.colors.secondary};
              transform: scale(1.05);
              color: ${({ theme }) => theme.colors.white};
            }
          }
        }
      }
    }

    iframe {
      margin-top: 3rem;
      // border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
  `;

  return (
    <Wrapper>
      <h2>Get in Touch</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1757.9681791475775!2d83.98484829747571!3d28.209246096288158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595b211bd1a83%3A0x6e0448208e5785b9!2sGanga%20Mo%3AMo%3A%20Restaurant!5e0!3m2!1sen!2snp!4v1719942818331!5m2!1sen!2snp"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullsScreen=""
        loading="lazy"
        title="myMap"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="container">
        <div className="contact-form">
          <h3>Contact Us</h3>
          <form
            action="https://formspree.io/f/movaqdnd"
            method="POST"
            className="contact-inputs"
          >
            <input
              type="text"
              placeholder="Enter your name"
              name="username"
              required
              autoComplete="off"
            />

            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              required
              autoComplete="off"
            />

            <textarea
              name="message"
              placeholder="Write your message"
              required
              autoComplete="off"
            ></textarea>

            <input type="submit" value="Send Message" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
