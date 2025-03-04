import boto3
from django.http import JsonResponse
from django.conf import settings

# Initialize DynamoDB client
dynamodb = boto3.resource(
    'dynamodb',
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name=settings.AWS_REGION
)

table = dynamodb.Table(settings.DYNAMODB_TABLE_NAME)

def get_stock_items(request):
    try:
        # Query DynamoDB table
        response = table.scan()
        items = response['Items']
        return JsonResponse({'stock_items': items}, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
