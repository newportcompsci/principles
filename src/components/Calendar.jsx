import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import BaseLink from "./BaseLink"
import { chunk } from "lodash"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import moment from "moment"

const rootStyles = css`
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
`

const CalendarHeader = styled.div`
  text-align: center;
  font-size: 2em;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2em;
`

const CalendarButton = styled.button`
  height: 100%;
  flex: 0 0 1em;
  border: 0;
  background-color: transparent;
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;

  :hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`

const WeekHeadings = styled.div`
  width: 100%;
  display: flex;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
`

const CalendarWeekContainer = styled.div`
  width: 100%;
  min-height: 200px;
  position: relative;
  padding-top: 2.5em;
`

const CalendarWeek = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const CalendarDay = styled.div`
  flex: 1 0 calc(100% / 7);
  text-align: center;
  padding: 0.5em;
`

const DateIndicator = styled.div`
  width: 2em;
  height: 2em;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2em;

  ${props => 
    props.today 
    ? css`
      color: ${props.theme.colors.white};
      background-color: ${props.theme.colors.primary};
    `
    : null
  }
`

const CalendarEventRow = styled.div`
  display: flex;
`

const EmptyEvent = styled.div`
  background-color: transparent;
  margin: 0;
  flex-basis: calc(${props => 100 * props.durr / 7}%); 
`

const CalendarEvent = styled(BaseLink)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  margin: 0.25em;
  border-radius: 0.5em;
  padding: 0.5em;
  font-size: 0.75em;
  z-index: 1;
  flex-basis: calc(${props => 100 * props.durr / 7}% - 0.5em); 

  :hover {
    color: ${props => props.theme.colors.white};
  }
`

class Calendar extends React.Component { 
  constructor(props) {
    super(props) 

    this.state = {
      currentMonth: moment().get('month')
    }
  }

  changeMonth(amount) {
    this.setState(state => ({
      currentMonth: state.currentMonth + amount
    }))
  }

  visibleDays(firstDayOfMonth) {
    let dates = []

    let currentDate = moment(firstDayOfMonth).startOf('month').startOf('week')
    let endDate = moment(firstDayOfMonth).endOf('month').endOf('week')

    while(currentDate.isSameOrBefore(endDate)) {
      dates.push(moment(currentDate))

      currentDate.add(1, 'days')
    }

    return dates
  }

  renderDay(day, index) {
    return (
      <CalendarDay key={`day-${index}`} >
        <DateIndicator today={moment().startOf('day').isSame(day)}>
          {day.format("D")}
        </DateIndicator>
      </CalendarDay>
    )
  }

  renderWeek(week, index) {
    let { dates } = this.props

    let weekDates = dates.filter(d => {
      return d.start.isSameOrAfter(week[0]) && d.end.isSameOrBefore(week[week.length - 1])
    })

    weekDates.sort((a, b) => {
      if (a.start.isBefore(b.start)) {
        return -1
      } else if (a.start.isAfter(b.start)) {
        return 1
      } else {
        let aDurr = a.end.diff(a.start)
        let bDurr = b.end.diff(b.start)

        return bDurr - aDurr
      }
    }) 

    let weekDatesLevels = weekDates.reduce((result, curr) => {
      let levelIndex = 0;

      while(levelIndex < result.length &&
            result[levelIndex].length > 0 &&
            result[levelIndex][result[levelIndex].length - 1].end.isAfter(curr.start)) {
        levelIndex++
      }

      if (levelIndex >= result.length) {
        if (curr.start.diff(week[0], 'days') > 0) {
          result.push([ {
            start: week[0],
            end: curr.start,
            empty: true
          }, curr ])
        } else {
          result.push([ curr ])
        }
      } else {
        if (curr.start.diff(result[levelIndex][result[levelIndex].length - 1].end, 'days') > 0) {
          result[levelIndex].push({
            start: result[levelIndex][result[levelIndex].length - 1].end,
            end: curr.start,
            empty: true
          })
        }

        result[levelIndex].push(curr)
      }

      return result
    }, [])

    return (
      <CalendarWeekContainer key={`week-container-${index}`}>
        <CalendarWeek key={`week-${index}`}>{week.map(this.renderDay)}</CalendarWeek>
        {weekDatesLevels.map(l => (
          <CalendarEventRow>
            {l.map((d, i) => {
              if (d.empty) {
                return <EmptyEvent durr={d.end.diff(d.start, 'days')} key={`empty-${i}`} /> 
              } else {
                return <CalendarEvent durr={d.end.diff(d.start, 'days')} key={d.path} to={d.path}>{d.title}</CalendarEvent> 
              }
            })}
          </CalendarEventRow>
        ))}
      </CalendarWeekContainer>
    )
  }

  renderWeekHeadings() {
    return (
      Array(7).fill().map((_, i) => (
        <CalendarDay key={`week-header-${i}`}>{moment(i, 'd').format("ddd")}</CalendarDay>
      ))
    )
  }

  render() {
    let firstDayOfMonth = moment(this.state.currentMonth + 1, "M")
    let dates = this.visibleDays(firstDayOfMonth)
    let weeks = chunk(dates, 7)

    return (
      <div css={rootStyles}>
        <CalendarHeader>
          <CalendarButton onClick={e => this.changeMonth(-1)}>
            <FiChevronLeft />
          </CalendarButton>

          {firstDayOfMonth.format("MMMM Y")}
          
          <CalendarButton onClick={e => this.changeMonth(1)}>
            <FiChevronRight />
          </CalendarButton>
        </CalendarHeader>

        <WeekHeadings>
          {this.renderWeekHeadings()}
        </WeekHeadings>

        {weeks.map(this.renderWeek.bind(this))}
      </div>
    )
  }
}

Calendar.propTypes = {
  dates: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.object,
      end: PropTypes.object,
      title: PropTypes.string, 
      path: PropTypes.string
    })
  )
}

export default Calendar