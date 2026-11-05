// One function creates the same product card on Home and Catalogue.
$(function () {
    function makeCard(product) {
        const card = $('<article class="product-card">');
        const photo = $('<div class="product-photo">');
        const gallery = $('<div class="product-gallery" tabindex="0">');
        const dots = $('<div class="gallery-dots">');

        for (let i = 0; i < product.variants.length; i++) {
            const variant = product.variants[i];
            const slide = $('<div class="product-slide">');
            const image = $('<img>');
            image.attr('src', variant.image);
            image.attr('alt', product.name + ' — ' + variant.color);
            image.attr('loading', 'lazy');
            slide.append(image);
            slide.append($('<span class="variant-label">').text(variant.color));
            gallery.append(slide);

            const dot = $('<button type="button" class="gallery-dot">');
            dot.attr('aria-label', product.name + ': colour ' + (i + 1) + ' of ' + product.variants.length);
            dot.attr('data-index', i);
            dots.append(dot);
        }

        function showActiveDot() {
            const width = gallery.get(0).clientWidth;
            if (!width) return;
            const index = Math.min(product.variants.length - 1,
                Math.round(gallery.get(0).scrollLeft / width));
            dots.find('button').removeClass('is-active').attr('aria-pressed', 'false');
            dots.find('button').eq(index).addClass('is-active').attr('aria-pressed', 'true');
        }

        gallery.on('scroll', showActiveDot);
        dots.on('click', 'button', function () {
            const index = Number($(this).attr('data-index'));
            gallery.stop().animate({ scrollLeft: index * gallery.width() }, 260);
            dots.find('button').removeClass('is-active').attr('aria-pressed', 'false');
            $(this).addClass('is-active').attr('aria-pressed', 'true');
        });
        dots.find('button').first().addClass('is-active').attr('aria-pressed', 'true');

        photo.append(gallery, dots);
        if (product.badge) {
            photo.append($('<span class="product-badge">').text(product.badge));
        }
        const info = $('<div class="product-info">');
        const heading = $('<div class="product-topline">');
        heading.append($('<h3 class="product-title">').text(product.name));
        heading.append($('<span class="discount-label">').text('-' + product.discount + '%'));
        info.append(heading);
        info.append($('<p class="product-meta">').text(product.season));

        const prices = $('<div class="product-prices">');
        prices.append($('<del class="product-old-price">').text(formatPrice(product.originalPrice)));
        prices.append($('<strong class="product-price">').text(formatPrice(product.price)));
        info.append(prices);

        const actions = $('<div class="product-actions">');
        actions.append($('<button type="button" class="btn btn-small btn-outline js-view-details">')
            .attr('data-id', product.id).text('Details'));
        const buy = $('<button type="button" class="btn btn-small js-add-selection">');
        buy.attr('data-id', product.id).text('Buy');
        if (isSelected(product.id)) buy.text('Selected').prop('disabled', true);
        actions.append(buy);
        info.append(actions);
        card.append(photo, info);
        return card;
    }

    // Four featured models on Home use exactly the same gallery and buttons.
    const featured = $('#featured-grid');
    if (featured.length) {
        const featuredIds = ['MD-005', 'MD-008', 'MD-001', 'MD-006'];
        featured.empty();
        for (let i = 0; i < featuredIds.length; i++) {
            featured.append(makeCard(getProduct(featuredIds[i])));
        }
    }

    // Details works on Home and Catalogue.
    $(document).on('click', '.js-view-details', function () {
        const product = getProduct($(this).attr('data-id'));
        const dialog = document.getElementById('product-dialog');
        if (!product || !dialog) return;

        $('#detail-image').attr('src', getPrimaryImage(product)).attr('alt', product.name);
        $('#detail-name').text(product.name);
        $('#detail-description').text(product.description);
        $('#detail-category').text(product.category);
        $('#detail-color').text(getColorList(product));
        $('#detail-price').text(formatPrice(product.price));
        $('#detail-add').attr('data-id', product.id);
        $('#detail-add').prop('disabled', isSelected(product.id));
        $('#detail-add').text(isSelected(product.id) ? 'Selected' : 'Buy');
        dialog.showModal();
    });

    $('.close-btn').on('click', function () {
        document.getElementById('product-dialog').close();
    });

    const catalogue = $('#catalogue-grid');
    if (!catalogue.length) return;

    let category = 'All';
    function showProducts() {
        const search = $('#product-search').val().trim().toLowerCase();
        let count = 0;
        catalogue.empty();
        for (let i = 0; i < STRIDE_PRODUCTS.length; i++) {
            const product = STRIDE_PRODUCTS[i];
            const categoryMatch = category === 'All' || product.category === category;
            const searchMatch = product.name.toLowerCase().includes(search);
            if (categoryMatch && searchMatch) {
                catalogue.append(makeCard(product));
                count++;
            }
        }
        $('#results-count').text('Showing ' + count + ' of ' + STRIDE_PRODUCTS.length + ' models');
        $('#catalogue-empty').prop('hidden', count !== 0);
    }

    $('#product-search').on('input', showProducts);
    $('.js-category').on('click', function () {
        category = $(this).attr('data-category');
        $('.js-category').removeClass('is-active').attr('aria-pressed', 'false');
        $(this).addClass('is-active').attr('aria-pressed', 'true');
        showProducts();
    });
    $('#clear-filters, #empty-reset').on('click', function () {
        category = 'All';
        $('#product-search').val('');
        $('.js-category').removeClass('is-active').attr('aria-pressed', 'false');
        $('.js-category[data-category="All"]').addClass('is-active').attr('aria-pressed', 'true');
        showProducts();
    });
    showProducts();
});
