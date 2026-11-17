// Get the weather and suggest a shoe.
// These weather numbers describe rain, snow and storms.
$(function () {
    const button = $('#weather-check');
    if (!button.length) return;

    button.on('click', async function () {
        button.prop('disabled', true).text('Checking weather...');
        $('#weather-result').prop('hidden', true);
        $('#weather-status').text('Loading weather for Astana...');

        try {
            const url = 'https://api.open-meteo.com/v1/forecast?' +
                'latitude=51.1694&longitude=71.4491' +
                '&current=temperature_2m,weather_code,precipitation' +
                '&timezone=Asia%2FAlmaty';
            const response = await fetch(url);
            if (!response.ok) throw new Error('Weather service unavailable');
            const data = await response.json();
            if (!data.current || typeof data.current.temperature_2m !== 'number') {
                throw new Error('Weather data missing');
            }

            const temperature = data.current.temperature_2m;
            const code = data.current.weather_code;
            const precipitation = data.current.precipitation;
            let model = 'MD-001'; // Studio: everyday weather
            let conditions = 'Mild weather';

            const wet = (code >= 51 && code <= 82) || code >= 95 || precipitation > 0;
            if (wet) {
                model = 'MD-008';
                conditions = 'Rain or snow in the forecast';
            } else if (temperature < 5) {
                model = 'MD-008';
                conditions = 'Cold weather';
            } else if (temperature >= 20) {
                model = 'MD-006';
                conditions = 'Warm weather';
            }

            const product = getProduct(model);
            $('#weather-reading').text(Math.round(temperature) + '°C · ' + conditions);
            $('#weather-suggestion').text('Style suggestion: ' + product.name + '. This is not a weather-safety rating.');
            $('#weather-product-link').attr('href', 'catalogue.html?details=' + product.id)
                .text('See STRIDE ' + product.name);
            $('#weather-status').text('Current model-based weather data for Astana:');
            $('#weather-result').prop('hidden', false);
        } catch (error) {
            $('#weather-status').text('Weather is unavailable right now. Browse the catalogue instead.');
        } finally {
            button.prop('disabled', false).text('Check Again');
        }
    });
});
