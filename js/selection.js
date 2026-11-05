// One chosen model appears once; the buttons change its quantity.
const selectionKey = 'stride-favourites-v2';

function getSelection() {
    try {
        return JSON.parse(localStorage.getItem(selectionKey)) || {};
    } catch (error) {
        return {};
    }
}

function saveSelection(items) {
    localStorage.setItem(selectionKey, JSON.stringify(items));
    $(document).trigger('selectionChanged');
}

function isSelected(id) {
    return getSelection()[id] !== undefined;
}

function showMessage(message) {
    $('#toast').stop(true, true).text(message).fadeIn(200).delay(1400).fadeOut(250);
}

function addProduct(id) {
    if (getProduct(id) === null) return;
    const selected = getSelection();
    if (selected[id] !== undefined) {
        showMessage('Already selected. Use + to increase quantity.');
        return;
    }
    selected[id] = 1;
    saveSelection(selected);
    showMessage('Added to Your Selection (demo — no checkout)');
}

function changeQuantity(id, amount) {
    const selected = getSelection();
    if (selected[id] === undefined) return;
    let quantity = Number(selected[id]) + amount;
    if (quantity > 10) quantity = 10;
    if (quantity <= 0) delete selected[id];
    else selected[id] = quantity;
    saveSelection(selected);
}

function updateBuyButtons() {
    $('.js-add-selection').each(function () {
        const selected = isSelected($(this).attr('data-id'));
        $(this).prop('disabled', selected).text(selected ? 'Selected' : 'Buy');
    });
}

function showSelection() {
    const list = $('#selection-list');
    if (!list.length) return;

    const selected = getSelection();
    let models = 0;
    let pairs = 0;
    let total = 0;
    list.empty();

    for (const id in selected) {
        const product = getProduct(id);
        const quantity = Number(selected[id]);
        if (!product || quantity < 1) continue;
        models++;
        pairs += quantity;
        total += product.price * quantity;

        const row = $('<article class="selection-row">');
        row.append($('<img>').attr('src', getPrimaryImage(product)).attr('alt', product.name));

        const info = $('<div>');
        info.append($('<h3>').text(product.name));
        info.append($('<p class="muted small">').text(product.category + ' · ' + getColorList(product)));
        info.append($('<p class="small">').text(formatPrice(product.price) + ' per pair'));
        row.append(info);

        const right = $('<div class="selection-right">');
        right.append($('<strong class="small">').text(formatPrice(product.price * quantity)));
        const controls = $('<div class="qty-control">');
        controls.append($('<button type="button" class="js-qty-minus">').attr('data-id', id).attr('aria-label', 'Decrease ' + product.name).text('−'));
        controls.append($('<output>').text(quantity));
        controls.append($('<button type="button" class="js-qty-plus">').attr('data-id', id).attr('aria-label', 'Increase ' + product.name).text('+'));
        right.append(controls);
        right.append($('<button type="button" class="remove-link js-remove-selection">').attr('data-id', id).text('Remove'));
        row.append(right);
        list.append(row);
    }

    $('#selection-empty').prop('hidden', models !== 0);
    $('#selection-summary').prop('hidden', models === 0);
    $('#selection-label-count, #distinct-count').text(models);
    $('#total-count').text(pairs);
    $('#total-price').text(formatPrice(total));
}

$(document).ready(function () {
    // Delegated events also work for cards built after page load.
    $(document).on('click', '.js-add-selection', function () {
        addProduct($(this).attr('data-id'));
    });
    $('#selection-list').on('click', '.js-qty-plus', function () {
        changeQuantity($(this).attr('data-id'), 1);
    });
    $('#selection-list').on('click', '.js-qty-minus', function () {
        changeQuantity($(this).attr('data-id'), -1);
    });
    $('#selection-list').on('click', '.js-remove-selection', function () {
        const selected = getSelection();
        delete selected[$(this).attr('data-id')];
        saveSelection(selected);
    });

    $(document).on('selectionChanged', function () {
        updateBuyButtons();
        showSelection();
    });
    $(window).on('storage', function () {
        updateBuyButtons();
        showSelection();
    });
    updateBuyButtons();
    showSelection();
});
