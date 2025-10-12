<?php

return [
  'paths' => ['api/*', 'sanctum/csrf-cookie'],

  'allowed_methods' => ['*'],  // or specific methods like ['GET','POST','PUT','DELETE']
  'allowed_origins' => [
    'https://your-frontend-domain.com',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  'allowed_origins_patterns' => [],

  'allowed_headers' => ['*'],  // or specific headers
  'exposed_headers' => [],
  'max_age' => 0,  // or a value like 3600
  'supports_credentials' => true,  // or true if you need cookies/auth
];
