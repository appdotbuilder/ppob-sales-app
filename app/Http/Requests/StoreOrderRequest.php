<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',
            'customer_phone' => 'required|string|max:20',
            'customer_email' => 'nullable|email|max:255',
            'customer_name' => 'required|string|max:255',
            'customer_id' => 'nullable|string|max:50',
            'notes' => 'nullable|string|max:500',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'product_id.required' => 'Produk harus dipilih.',
            'product_id.exists' => 'Produk yang dipilih tidak valid.',
            'customer_phone.required' => 'Nomor HP customer harus diisi.',
            'customer_phone.max' => 'Nomor HP customer maksimal 20 karakter.',
            'customer_name.required' => 'Nama customer harus diisi.',
            'customer_name.max' => 'Nama customer maksimal 255 karakter.',
            'customer_email.email' => 'Format email tidak valid.',
            'notes.max' => 'Catatan maksimal 500 karakter.',
        ];
    }
}