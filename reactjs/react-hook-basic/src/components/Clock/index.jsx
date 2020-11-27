import React, { useState, useEffect } from "react";
import useClock from "../../hooks/useClock";

Clock.propTypes = {};

function Clock(props) {
  const { timeString } = useClock();

  return <p style={{ fontSize: "42px" }}>{timeString}</p>;
}

export default Clock;
