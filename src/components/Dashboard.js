import React from 'react'
import PropTypes from 'prop-types';
import { Table, Container } from 'reactstrap';
import Slider from 'rc-slider';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Dashboard = ({data}) => {
    const maxYear = data[0].year;
    const minYear = data[data.length - 1].year;

    const [rangeMin, setRangeMin] = React.useState(minYear);
    const [rangeMax, setRangeMax] = React.useState(maxYear);
    const handleChange = (value) => {
        setRangeMin(value[0])
        setRangeMax(value[1])
    }
    const marks = {
        [minYear]: minYear,
        [maxYear]: maxYear,
      };

    return (
        <Container className="container">
          <h4>S&P 500 Total Returns by Year</h4>
          <Range className="range"
           min={minYear}
           max={maxYear}
           range={true} 
           marks={marks}
           tipFormatter={value => value}
           value={[rangeMin,rangeMax]} 
           onChange={handleChange}
            />
            <Table striped bordered>
            <tbody>
            <tr>
          <th>Year</th>
          <th>Total Return</th>
          <th>Cumulative returns</th>
              </tr>
            {data
            .filter(data => data.year >= rangeMin && data.year <= rangeMax)
            .sort((a,b) => (a.year < b.year ? -1 : 1))
            .map((data, index, arr) =>({
                ...data,
                cumulativeReturn: arr.slice(0, index + 1)
                .reduce((acc, curr) => ( acc + parseFloat(curr.totalReturn)
                ), 0),
            }))  
            .map((data, index) => (
                <tr key={index}>
                <td>{data.year}</td>
                {data.totalReturn > 0 ? (
                   <td>{data.totalReturn}</td>  
                ) : (
                 <td className="negative__return">{data.totalReturn}</td>
                )}
                {data.cumulativeReturn > 0 ? (
                    <td>{data.cumulativeReturn.toFixed(2)}</td>
                  ) : (
                    <td className="negative__return">{data.cumulativeReturn.toFixed(2)}</td>
                  )}
           </tr>
                )
            )}
          </tbody>
           </Table>
        </Container>
    )
}

Dashboard.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
        totalReturn: PropTypes.string,
        year: PropTypes.number
    })).isRequired
  };

export default Dashboard





