#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "argon2.h"
#include "emscripten.h"

EMSCRIPTEN_KEEPALIVE
const int secret(const int key, const int iters)
{
    int seed = key;
    int a = 1664525;
    int c = 1013904223;
    int modulus = (1 << 31);
    for (int i = 0; i < iters + 777; i++)
    {
        seed = (a * seed + c) % modulus;
    }
    return seed;
}

EMSCRIPTEN_KEEPALIVE
const char *argon_hash(const char *SALT, const char *PWD, const uint32_t HASHLEN, const uint32_t LOWERS,
                       const uint32_t UPPERS, const uint32_t NUMS, const uint32_t SPCLS)
{

    uint8_t *hash = (uint8_t *)malloc(HASHLEN);

    uint8_t *salt = (uint8_t *)strdup(SALT);
    uint32_t saltlen = strlen((char *)salt);

    uint8_t *pwd = (uint8_t *)strdup(PWD);
    uint32_t pwdlen = strlen((char *)pwd);

    uint32_t t_cost = 12;        // 12 iterations
    uint32_t m_cost = (1 << 16); // 2^16 kibibytes
    uint32_t parallelism = 1;    // 1 thread

    int result = argon2id_hash_raw(t_cost, m_cost, parallelism, pwd, pwdlen, salt, saltlen, hash, HASHLEN);
    if (result != ARGON2_OK)
    {
        return argon2_error_message(result);
    }
    else
    {
        for (uint8_t i = 0; i < HASHLEN; i++)
        {
            hash[i] = (hash[i] % (('~' + 1) - '!')) + '!';
            // First Pass
            if (!SPCLS && !isalnum(hash[i]))
            {
                hash[i] = (hash[i] % (('9' + 1) - '0')) + '0';
            }
            if (!NUMS && isdigit(hash[i]))
            {
                hash[i] = (hash[i] % (('Z' + 1) - 'A')) + 'A';
            }
            if (!UPPERS && isupper(hash[i]))
            {
                hash[i] = (hash[i] % (('z' + 1) - 'a')) + 'a';
            }
            if (!LOWERS && islower(hash[i]))
            {
                hash[i] = (hash[i] % (('/' + 1) - '!')) + '!';
            }

            // Repeat Once More
            if (!SPCLS && !isalnum(hash[i]))
            {
                hash[i] = (hash[i] % (('9' + 1) - '0')) + '0';
            }
            if (!NUMS && isdigit(hash[i]))
            {
                hash[i] = (hash[i] % (('Z' + 1) - 'A')) + 'A';
            }
            if (!UPPERS && isupper(hash[i]))
            {
                hash[i] = (hash[i] % (('z' + 1) - 'a')) + 'a';
            }
            if (!LOWERS && islower(hash[i]))
            {
                hash[i] = (hash[i] % (('/' + 1) - '!')) + '!';
            }
        }
        return ((char *)hash);
    }
}
