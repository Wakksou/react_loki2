FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update \
    && apt-get install -y \
       libpng-dev \
       libjpeg-dev \
       libfreetype6-dev \
       zip \
       unzip \
       git \
       curl \
       libonig-dev \
       libxml2-dev \
       libzip-dev \
       vim \
       mariadb-client \
       unzip \
       libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql opcache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www
