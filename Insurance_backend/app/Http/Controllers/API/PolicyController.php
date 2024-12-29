<?php
namespace App\Http\Controllers\API;

use App\Models\Policy;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class PolicyController extends Controller
{
    // List all policies
    public function index()
    {
        $policies = Policy::all();
        return response()->json($policies);
    }

    // Create a new policy
    public function store(Request $request)
    {
        $request->validate([
            'policy_number' => 'required|unique:policies',
            'customer_name' => 'required',
            'policy_type' => 'required|in:Health,Life,Auto,Property,Travel',
            'status' => 'required|in:Pending,Active,Expired',
            'premium_amount' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $policy = Policy::create($request->all());
        return response()->json(['message' => 'Policy created successfully', 'policy' => $policy]);
    }

    // Show a specific policy
    public function show($id)
    {
        $policy = Policy::find($id);

        if (!$policy) {
            return response()->json(['message' => 'Policy not found'], 404);
        }

        return response()->json($policy);
    }

    // Update an existing policy
    public function update(Request $request, $id)
    {
        $policy = Policy::find($id);

        if (!$policy) {
            return response()->json(['message' => 'Policy not found'], 404);
        }

        $request->validate([
            'policy_number' => 'sometimes|unique:policies,policy_number,' . $id,
            'customer_name' => 'sometimes',
            'policy_type' => 'sometimes|in:Health,Life,Auto,Property,Travel',
            'status' => 'sometimes|in:Pending,Active,Expired',
            'premium_amount' => 'sometimes|numeric',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date',
        ]);

        $policy->update($request->all());
        return response()->json(['message' => 'Policy updated successfully', 'policy' => $policy]);
    }

    // Delete a policy
    public function destroy($id)
    {
        $policy = Policy::find($id);

        if (!$policy) {
            return response()->json(['message' => 'Policy not found'], 404);
        }

        $policy->delete();
        return response()->json(['message' => 'Policy deleted successfully']);
    }

    public function getDashboardData()
{
    $totalActivePolicies = Policy::where('status', 'active')->count();
    $premiumsCollected = Policy::sum('premium_amount');
    $expiringPolicies = Policy::where('end_date', '<=', now()->addDays(30))->count();

    return response()->json([
        'total_active_policies' => $totalActivePolicies,
        'premiums_collected' => $premiumsCollected,
        'policies_expiring_soon' => $expiringPolicies,
    ]);
}

}
