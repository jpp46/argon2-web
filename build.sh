emcc -std=gnu99 -O3 -flto --closure 1 \
-I./argon2/include -I./argon2/src -DARGON2_NO_THREADS=1 \
./argon2/src/argon2.c ./argon2/src/core.c ./argon2/src/blake2/blake2b.c \
./argon2/src/thread.c ./argon2/src/encoding.c ./argon2/src/ref.c \
-s INLINING_LIMIT=1 -s FILESYSTEM=0 -s ALLOW_MEMORY_GROWTH=1 \
-s MODULARIZE -s EXPORTED_FUNCTIONS='["_secret", "_argon_hash"]' -s EXPORTED_RUNTIME_METHODS='["cwrap", "ccall"]' \
argon2-web.c -o argon2-web.js