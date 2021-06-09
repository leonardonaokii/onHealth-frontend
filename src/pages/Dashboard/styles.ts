import styled from 'styled-components';
import { shade, lighten } from 'polished';

import ArrowLeftIcon from '../../assets/ArrowLeftIcon.svg';
import ArrowRightIcon from '../../assets/ArrowRightIcon.svg';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #837fd3;
    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;
      font-weight: 500;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #837fd3;
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #837fd3;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      content: '';
      background: #837fd3;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #000000;
      font-size: 24px;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #000000;

      svg {
        color: #000000;
        margin-right: 8px;
      }
    }

    svg {
      width: 24px;
      height: 24px;
      color: #f0f2f5;
      margin-left: 10px;

      &:hover {
        color: ${shade(0.2, '#f0f2f5')};
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #000000;
    width: 70px;

    svg {
      color: #837fd3;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #837fd3;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      padding: 0;
      color: #000;
      font-size: 20px;
    }

    a {
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;

      svg {
        width: 24px;
        height: 24px;
        color: #f0f2f5;

        &:hover {
          color: ${shade(0.2, '#f0f2f5')};
        }
      }
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    border-radius: 10px;

    &-wrapper {
      padding-bottom: 0;
      background: #c0fefc;
      border-radius: 10px;
      z-index: 0;
    }

    &-NavBar {
      position: relative;

      ::before {
        content: '';
        width: 100%;
        height: 50px;
        position: absolute;
        background: #3edbf0;
        border-radius: 10px 10px 0 0;
        z-index: -1;
      }
    }

    &-NavButton {
      color: #3edbf0 !important;
      margin-top: 0;
      top: 0;

      &--prev {
        background: url(${ArrowLeftIcon}) no-repeat center;
        margin-right: 0;
        left: 12px;
        width: 50px;
        height: 50px;
      }

      &--next {
        background: url(${ArrowRightIcon}) no-repeat center;
        right: 12px;
        width: 50px;
        height: 50px;
      }
    }

    &-Month {
      border-collapse: separate;
      border-spacing: 8px;
      margin: 0;
      padding: 0 10px 10px;
    }

    &-Caption {
      line-height: 50px;
      color: #000000;

      > div {
        text-align: center;
      }
    }

    &-Weekday {
      color: #000000;
      font-size: 16px;
    }

    &-Day {
      width: 40px;
      height: 40px;
      transition: all 0.2s ease;
      border-radius: 10px;

      &--today {
        font-weight: normal;
        color: #000000;
      }

      &--available:not(.DayPicker-Day--outside) {
        background: #3edbf0;
        border-radius: 10px;
      }

      &--disabled {
        color: #666360;
        background: transparent !important;
      }

      &--selected:not(.DayPicker-Day--disabled) {
        background: #0ba0cf !important;
        color: #232129 !important;
      }
    }

    &:not(.DayPicker--interactionDisabled)
      .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background: ${shade(0.2, '#3edbf0')};
    }
  }
`;
