import './Bottle.css'
import PropTypes from 'prop-types'
const Bottle = ({bottle,handleAddToCart}) => {
    const {name,img,price}=bottle
    return (
        <div className="bottle">
            <h3>Bottle:{name} </h3>
            <img src={img} alt="" />
            <p>$ {price}</p>
            <button onClick={handleAddToCart}>purchase</button>
        </div>
    );
};
Bottle.propTypes={
    bottle:PropTypes.object.isRequired,
    handleAddToCart:PropTypes.func.isRequired
}
export default Bottle;