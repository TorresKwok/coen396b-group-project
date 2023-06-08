const fetchElevation = async (lat, lng) => {
    const response = await fetch(`https://api.opentopodata.org/v1/srtm90m?locations=${lat},${lng}&interpolation=cubic`);
    const { results } = await response.json();
    return results[0].elevation;
}

export { fetchElevation };